from channels.generic.websocket import AsyncWebsocketConsumer
import json
from random import randint
from asyncio import sleep

class GraphConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    await self.accept()

    while True:
      await self.send(json.dumps({'value': randint(580, 700)}))
      await sleep(1)