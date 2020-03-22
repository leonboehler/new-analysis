#include "../sim/include/HTTPRequest.hpp"
#include <string>
#include <iostream>

using namespace std;

int main(int argc, char ** argv) //setup()
{

string req = "'slave_post_data': { 'station_id': 987654321,'battery':3.800000, buckets: [{'forg_amount':0,'bucket_id':123456789,'battery':3.700000},{'forg_amount':7,'bucket_id':123456781,'battery':3.700000},{'forg_amount':86,'bucket_id':123456782,'battery':3.500000},{'forg_amount':85,'bucket_id':123456783,'battery':3.600000},{'forg_amount':2,'bucket_id':123456785,'battery':3.700000},{'forg_amount':1,'bucket_id':123456787,'battery':3.700000}]}";
http::Request request("http://httpbin.org/ip");

    // send a get request
    //const http::Response postResponse = request.send("POST", req, {"Content-Type: application/json"});
    const http::Response postResponse = request.send("GET");
    string response = string(postResponse.body.begin(), postResponse.body.end()); // print the result
    cout << response << endl;

    return 0;
}