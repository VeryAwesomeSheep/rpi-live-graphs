from channels.generic.websocket import AsyncWebsocketConsumer
import json
from random import randint
from asyncio import sleep
import re, subprocess

class GraphConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    await self.accept()

    while True:
      temp = None
      err, msg = subprocess.getstatusoutput('vcgencmd measure_temp')
      if not err:
        m = re.search(r'-?\d\.?\d*', msg)
        try:
          temp = float(m.group())
        except ValueError:
          continue

      await self.send(json.dumps({'value': temp}))
      await sleep(10) # time between data plots