package com.example.server.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.example.server.DTO.PostDTO;
import com.example.server.models.Entity.Comment;
import com.example.server.models.Entity.Post;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

@Repository
public interface PostRepository extends Neo4jRepository<Post, String> {
    @Query("MATCH (post:Post {id: $postId})<-[:LIKED_BY]-(user:User) RETURN user.id")
    List<String> getLikeUser(@Param("postId") String postId);
    @Query("MATCH (p:Post)-[:SHARED_BY]->(u:User) WHERE id(p) = $postId RETURN count(u) AS shareCount")
    int getShareCount(@Param("postId") String postId);
    @Query("MATCH (post:Post)<-[:POSTED_BY]-(u:User{id : $user_id})\r\n" + //
                "WHERE NOT (post)<-[:COMMENTED_ON]-(:Post) AND NOT (post)<-[:COMMENTED_ON]-(:Share_post)\r\n" + //
                "MATCH (user)-[:HAS_PROFILE]-(profile:Profile)\r\n" + //
                "MATCH (me:User{id: $me_id})\r\n" + //
                "WITH DISTINCT post, user, profile, u, me\r\n" + //
                "OPTIONAL MATCH (post)-[:LIKED_BY]-(like:User) \r\n" + //
                "OPTIONAL MATCH (post)-[:SHARED_POST]-(share:Share_post) \r\n" + //
                "OPTIONAL MATCH (post)-[:CONTAINS]->(attachment:Post_attachment) \r\n" + //
                "WITH post, user, profile, u, me,\r\n" + //
                "     post.id AS id, post.content AS content, post.created_at AS created_at, post.updated_at AS updated_at,\r\n" + //
                "     user.id AS userId , user.username AS username, user.firstname + \" \"+ user.lastname AS fullName, \r\n" + //
                "     profile.avatar_url AS avatarUrl, \r\n" + //
                "     COLLECT(DISTINCT like) AS likes,\r\n" + //
                "     count(like) AS like_count, count(share) AS share_count,  \r\n" + //
                "     COLLECT( { url: attachment.url, type: attachment.type, id : attachment.id, create_at:attachment.created_at }) AS attachments\r\n" + //
                "ORDER BY post.timestamp DESC\r\n" + //
                "SKIP 1 LIMIT 10\r\n" + //
                "RETURN id, content, created_at, updated_at, userId, username, fullName, avatarUrl, \r\n" + //
                "       like_count, share_count, attachments,\r\n" + //
                "       CASE WHEN me IN likes THEN true ELSE false END AS isLike\r\n" + //
                "")
    List<PostDTO> findByUserId(@Param("user_id") String user_id, String me_id);
    @Query("MATCH (u:User {id : $id})-[:FRIEND]-(user:User)-[:POSTED_BY]->(post:Post)\r\n" + //
                "WHERE NOT (post)<-[:COMMENTED_ON]-(:Post) AND NOT (post)<-[:COMMENTED_ON]-(:Share_post)\r\n" + //
                "MATCH (user)-[:HAS_PROFILE]-(profile:Profile)\r\n" + //
                "WITH DISTINCT post, user, profile, u\r\n" + //
                "OPTIONAL MATCH (post)-[:LIKED_BY]-(like:User) \r\n" + //
                "OPTIONAL MATCH (post)-[:SHARED_POST]-(share:Share_post) \r\n" + //
                "OPTIONAL MATCH (post)-[:CONTAINS]->(attachment:Post_attachment) \r\n" + //
                "WITH post, user, profile, u,\r\n" + //
                "     post.id AS id, post.content AS content, post.created_at AS created_at, post.updated_at AS updated_at,\r\n" + //
                "     user.id AS userId , user.username AS username, user.firstname + \" \"+ user.lastname AS fullName, \r\n" + //
                "     profile.avatar_url AS avatarUrl, \r\n" + //
                "     COLLECT(DISTINCT like) AS likes,\r\n" + //
                "     count(like) AS like_count, count(share) AS share_count,  \r\n" + //
                "REDUCE(s = \"\", url IN COLLECT(attachment.url) | s + url + \", \") AS attachments_url\r\n" + //"
                "ORDER BY post.timestamp DESC\r\n" + //
                "SKIP $skip LIMIT $limit\r\n" + //
                "RETURN id, content, created_at, updated_at, userId, username, fullName, avatarUrl, \r\n" + //
                "       like_count, share_count, attachments_url,\r\n" + //
                "       CASE WHEN u IN likes THEN true ELSE false END AS isLike\r\n" + //
                "")
    List<PostDTO> getTimelinePosts(String id, int skip, int limit);


    @Query("MATCH (p1:Post {id: $postId}), (p2:Post {id: $commentId}) CREATE (p1)-[:COMMENTED_ON]->(p2)")
    void addCommentToPost(@Param("postId") String postId,@Param("commentId") String commentId);
    @Query("MATCH (p1:Post {id: $postId})-[r:COMMENTED_ON]->(p2:Post) DETACH DELETE r,p2")
    void deleteComment(@Param("postId") String postId);

    @Query("MATCH (p:Post {id: $postId})-[:COMMENTED_ON]->(c:Post) RETURN c.id ORDER BY c.createdAt DESC")
    List<String> getCommentsForPost(@Param("postId") String postId);
}