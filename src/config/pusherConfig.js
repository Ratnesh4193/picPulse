import Pusher from "pusher";
import PusherJS from "pusher-js";

export const pusherServer = new Pusher({
  appId: "1761790",
  key: "8138a8174708dc46d3df",
  secret: "af9bfe02864d6cd87206",
  cluster: "ap2",
});

export const pusherClient = new PusherJS("8138a8174708dc46d3df", {
  cluster: "ap2",
});
