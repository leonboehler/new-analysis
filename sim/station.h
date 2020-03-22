#include <stdint.h>
#include <string>
#include <chrono>
#include <thread>
#include <iostream>
#include <fstream>
#include <vector>

#include "include/HTTPRequest.hpp"
#include "include/rapidjson/document.h"

#include "tools.h"

using namespace std;
using namespace rapidjson;

uint32_t station_id = 987654321; //max = 4294967295
uint8_t time_requestIntervall = 15; // in Minuten
string request_URI = "http://webhook.site/a40e63e4-2a2e-4513-8a69-07a6210791a7";

vector<string> bucket_data;

int main(int argc, char ** argv); //setup()
void loop();
void receiveData();
float readVoltage();
string parseData();
void sendRequest(string);

// dummy Klassen um Arduino Funktionen zu ersetzten
void dummy433Send(string);
string dummy433Receive();
string dummySendRequest(string);
void dummyRestart();

// variablen zum simulieren
float battery = 4.2;
bool debug = true;