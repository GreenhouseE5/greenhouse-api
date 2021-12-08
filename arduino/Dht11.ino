#include "DHT.h"

#define DHTTYPE DHT11

const int DHTPin = 7;

DHT dht(DHTPin, DHTTYPE);

void setup() {
  Serial.begin(9600);

  dht.begin();

}

void loop() {

  delay(1000);

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h)|| isnan(t)){
    Serial.println("NaN");
    return;
  }

  Serial.print("H:");
  Serial.print(h);
  //Serial.print(" %/t");
  Serial.print("T:");
  Serial.print(t);
  //Serial.print(" *C ");
  Serial.println("");

}

/***********************/
