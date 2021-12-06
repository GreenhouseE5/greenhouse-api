from constants import Constants
from serial import Serial
import time

def readSensorValue():
    time.sleep(5)
    return { 'temperature': 23, 'humidity': 68 }