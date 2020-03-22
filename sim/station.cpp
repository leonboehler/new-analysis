#include "station.h"

int main(int argc, char ** argv) //setup()
{
    cout << "main" << endl;
    loop();
}
void loop()
{
    cout << "loop" << endl;
    while(true)
    {
        chrono::minutes intervall(time_requestIntervall);
        chrono::system_clock::time_point end = chrono::system_clock::now() + intervall;
        chrono::seconds sleepTime(5);
        while(end > chrono::system_clock::now())
        {
            receiveData();
            // zum verhindern von prozessor dauerlast
            this_thread::sleep_for(sleepTime);
        }
        sendRequest(parseData());
    }
}

void receiveData()
{
    cout << "receiveData" << endl;
    string returned = dummy433Receive();
    if(returned != "")
        bucket_data.push_back(returned);
}
float readVoltage()
{
    cout << "readVoltage" << endl;
    return 3.8;
}
string parseData()
{
    string reqStr = "\"slave_post_data\": { \"station_id\": "+to_string(station_id)+",\"battery\":"+to_string(readVoltage())+", buckets: [";
    for (vector<string>::iterator it = bucket_data.begin(); it != bucket_data.end(); ++it)
    {
        string frogs = it->substr(0,it->find(';'));
        it->replace(it->begin(),it->begin()+it->find(';')+1,"");
        string volt = it->substr(0,it->find(';'));
        it->replace(it->begin(),it->begin()+it->find(';')+1,"");
        string bucket_id = it->substr(0,it->find(';'));

        if(it != bucket_data.begin())
            reqStr += ",{";
        else
            reqStr += "{";
        reqStr += "\"forg_amount\":"+frogs+",\"bucket_id\":"+bucket_id+",\"battery\":"+volt+"}";
    }
    reqStr += "]}";

    bucket_data.clear();

    return reqStr;
}
void sendRequest(string req)
{
    cout << "sendRequest" << endl;
    const char* response = dummySendRequest(req).c_str();

    // Document d;
    // d.Parse(response);
}

// dummy Klassen um Arduino Funktionen zu ersetzten
void dummy433Send(string sendStr)
{
    cout << "dummy433Send" << endl;
    ofstream myfile;
    myfile.open ("receive.txt",std::ofstream::out | std::ofstream::app);
    myfile << sendStr +"\n";
    myfile.close();
}
string dummy433Receive()
{
    cout << "dummy433Receive" << endl;
    string line;
    ifstream myfile ("send.txt");
    if (myfile.is_open())
    {   
        bool found = false;
        uint16_t count = 1;
        while ( getline (myfile,line) )
        {
            if(line != "")
            {
                found = true;
                break;
            }
            count++;
        }
        myfile.close();
        if(found)
        {
            delete_line("send.txt",count);
            return line;
        }
    }
    else 
        cout << "Unable to open file";     
    return ""; 
}
string dummySendRequest(string req)
{
    cout << "dummySendRequest" << endl;
    ofstream myfile;
    myfile.open ("request.txt");
    myfile << req;
    myfile.close();


    http::Request request(request_URI);

    // send a get request
    const http::Response postResponse = request.send("POST", req, {"Content-Type: application/json"});
    string response = string(postResponse.body.begin(), postResponse.body.end()); // print the result
    cout << response << endl;
 
    return response;
}