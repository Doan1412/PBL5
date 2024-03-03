package com.example.server.configuration;

import org.springframework.stereotype.Component;

import com.example.server.models.SocketNoti;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Date;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SocketNotiHandle extends Thread{
	static List<SocketNotiHandle> clients = new ArrayList<>();
	private Socket soc;
	private DataInputStream dis;
	private DataOutputStream dos;
	private String user;

	public SocketNotiHandle(Socket soc, String user) throws Exception{
		this.soc = soc;
		this.user = user;
		this.dis = new DataInputStream(soc.getInputStream());
		this.dos = new DataOutputStream(soc.getOutputStream());
		clients.add(this);
	}
	
	public void run() {
		try {
			while(true){
				String rec = this.dis.readUTF();
				{
					ObjectMapper mapper = new ObjectMapper();
					SocketNoti socketNoti = mapper.readValue(rec, SocketNoti.class);
					// System.out.println(socketNoti.getGroup() + " " + socketNoti.getPayload());
					for (SocketNotiHandle client : clients) {
						if (client.user.equals(socketNoti.getGroup())) {
							client.dos.writeUTF(this.user + " gui ne: " + socketNoti.getPayload());
						}
						if (socketNoti.getGroup().equals("all")) {
							client.dos.writeUTF(this.user + " gui group: " + socketNoti.getPayload());
						}
					}
				}
				// System.out.println(rec);
				if (!rec.isEmpty()) {
					this.dos.writeUTF(new Date().toString());
				} else {
					this.dos.writeUTF("Bad request");
				}
		}
		} catch(Exception e) {
			// System.out.println("TLE");
		}
	}

}
