#include <stdint.h>
#include <string>
#include <chrono>
#include <thread>
#include <iostream>
#include <fstream>
#include <iomanip>
#include <sstream>

#include "tools.h"

using namespace std;

uint32_t bucket_id = 123456789; //max = 4294967295
uint8_t time_deepsleep = 15; // in Minuten
uint8_t time_listen433 = 30; // in Sekunden

int main(int argc, char ** argv); //setup()
void loop();
void calibrate();
uint8_t readSensor();
float readVoltage();
string parseData(uint8_t,float);
void sendData(string);

// dummy Klassen um Arduino Funktionen zu ersetzten
void dummySleep(uint8_t);
void dummy433Send(string);
uint8_t dummy433Receive();
void dummyWriteMemory(uint16_t, uint8_t);
uint8_t dummyReadMemory(uint16_t);
void dummyRestart();

// variablen zum simulieren
float battery = 4.2;
uint8_t frogs = 0;
bool debug = true;
