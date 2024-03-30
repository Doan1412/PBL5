package com.example.server.configuration;

import org.springframework.stereotype.Component;

import com.example.server.DTO.MessageDTO;
import com.example.server.models.Entity.ChatRoom;
import com.example.server.models.Entity.User;
import com.example.server.repositories.ChatRoomRepository;
import com.example.server.service.ChatRoomService;
import com.example.server.service.MessageService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Date;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class SocketNotiHandle extends Thread{
	private static List<SocketNotiHandle> clients = new ArrayList<>();
	private static ChatRoomService chatRoomService;
	private static MessageService messageService;
	private static ChatRoomRepository chatRoomRepository;
	private Socket soc;
	private DataInputStream dis;
	private DataOutputStream dos;
	private String userId;

	public SocketNotiHandle(Socket soc, String userId) throws Exception{
		this.soc = soc;
		this.userId = userId;
		this.dis = new DataInputStream(soc.getInputStream());
		this.dos = new DataOutputStream(soc.getOutputStream());
		clients.add(this);
	}
	
	public void run() {
		try {
			while(true){
				String rec = this.dis.readUTF();
				if (rec != null && !rec.isEmpty())
				{
					ObjectMapper mapper = new ObjectMapper();
					MessageDTO messageDTO = mapper.readValue(rec, MessageDTO.class);
					Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findById(messageDTO.getRoomId());
					if (chatRoomOptional.isPresent()){
						messageService.sendMessage(messageDTO.getSenderId(), messageDTO.getRoomId(), messageDTO.getContent());
						Set<User> members = chatRoomService.getMembersOfChatRoom(messageDTO.getRoomId());
						for (User member : members) {
							for (SocketNotiHandle client : clients) {
								if (client.userId.equals(member.getId())) {
									client.dos.writeUTF(rec);
								}
							}
						}
						this.dos.writeUTF(new Date().toString());
					}
				}
			else {
					this.dos.writeUTF("Bad request");
				}
		}
		} catch(Exception e) {
			// System.out.println("TLE");
		}
	}
}
