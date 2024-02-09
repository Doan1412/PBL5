"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

export default function Homepage () {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);

  return (
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Layout style={{ marginLeft: 200, marginRight: 200 }}>
          <Sider
            width={200}
            style={{
              overflow: isHoveredLeft ? "auto" : "hidden",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 64,
              bottom: 0,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(204, 204, 204, 0.5) transparent",
              overscrollBehaviorY: "none",
            }}
            onMouseEnter={() => setIsHoveredLeft(true)}
            onMouseLeave={() => setIsHoveredLeft(false)}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={items}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div style={{ padding: 24, textAlign: "center" }}>
                <p>nội dung dài</p>
                {Array.from({ length: 100 }, (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? "thêm" : "..."}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </Content>
          </Layout>
          <Sider
            width={200}
            style={{
              overflow: isHoveredRight ? "auto" : "hidden",
              height: "100vh",
              position: "fixed",
              right: 0,
              top: 64,
              bottom: 0,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(204, 204, 204, 0.5) transparent",
              overscrollBehaviorY: "none",
            }}
            onMouseEnter={() => setIsHoveredRight(true)}
            onMouseLeave={() => setIsHoveredRight(false)}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={items}
            />
          </Sider>
        </Layout>
      </Layout>

  );
};