#pragma once 


#include <map>
#include <string>
#include <vector>


class KeyStoreSimulator
{
    public:

        void registerAccount(const char *address, const char *password);
        bool unlockAccount(const char *address, const char *password, size_t duration);
        std::vector<std::string> getAccounts();
        bool isUnlocked(const char *address);

    private:
        std::map<std::string, std::string> _accounts;
        std::map<std::string, time_t> _locks;
};
