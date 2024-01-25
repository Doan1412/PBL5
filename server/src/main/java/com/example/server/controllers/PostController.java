package com.example.server.controllers;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Paths;

import org.springframework.core.io.Resource;

import com.example.server.service.PostAttachmentService;
import com.example.server.service.PostService;
import com.example.server.utils.Respond;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
public class PostController {
    private final PostService service;
    private final PostAttachmentService postAttachmentService;

    @GetMapping("/attachment/{url}")
    public ResponseEntity<Object> serveFile(@PathVariable String url) {
        try {
            // Đường dẫn đến thư mục chứa các tệp
            String directoryPath = "src/main/resources/static";

            // Tạo một đối tượng Resource cho tệp cụ thể
            Resource resource = new UrlResource(Paths.get(directoryPath+url).toUri());

            // Kiểm tra xem tệp có tồn tại không
            if (resource.exists() && resource.isReadable()) {
                // Trả về ResponseEntity chứa tệp và các HTTP headers
                return ResponseEntity.ok()
                        .header("Content-Disposition", "attachment; filename=" + url)
                        .body(resource);
            } else {
                // Trả về 404 Not Found nếu tệp không tồn tại
                return ResponseEntity.notFound().build();
            }
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getStackTrace());
        }
    }

    @PostMapping("/{user_id}")
    public ResponseEntity<Object> post(@PathVariable String user_id,@RequestParam("attach") MultipartFile[] file, @RequestParam String content) {
        try {
            Object data = service.create(user_id,content,file);
            return Respond.success(200,"I001",data);
        }
        catch (Exception e){
            return Respond.fail(500,"E001",e.getMessage());
        }
    }
}
