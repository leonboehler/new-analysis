#include <stdint.h>

using namespace std;

uint32_t bucket_id = 123456789; //max = 4294967295
uint8_t time_deepsleep = 15; // in Minuten
uint8_t time_listen433 = 30; // in Sekunden

uint32_t calibrated_value = 0;

void loop();
void calibrate();
uint8_t readSensor();
float readVoltage();
String parseData(uint8_t,float);
void sendData(string);
