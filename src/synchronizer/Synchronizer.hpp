#pragma once

#include <QObject>

#include "ethrpc/Provider.hpp"
#include "ethrpc/BlockChain.hpp"

#include "ChainProgressFetcher.hpp"
#include "ChainScanner.hpp"
#include "AccountsLoader.hpp"

namespace Xeth{


class Synchronizer : public QObject
{
    Q_OBJECT
    public:
        typedef Xeth::ChainProgressFetcher SyncProgress;
        typedef Xeth::ScanProgress ScanProgress;
        typedef Xeth::ChainScanner Scanner;

    public:
        Synchronizer(Ethereum::Connector::Provider &, DataBase &);
        Synchronizer(Ethereum::Connector::Provider &, DataBase &, const Settings &);

        void scan();

        void stop();

        void watchAddress(const std::string &);
        void watchAddress(const std::string &, time_t);

        void watch(const EthereumKey &);
        void watch(const Ethereum::Address &);
        void watch(const StealthKey &);

        void watch(const EthereumKey &, time_t);
        void watch(const Ethereum::Address &, time_t);
        void watch(const StealthKey &, time_t);

        const SyncProgress & getSyncProgressFetcher() const;
        const Scanner & getScanner() const;
        const ScanCriteria & getScanCriteria() const;
        const BalanceObserver & getBalanceObserver() const;

        void loadAddresses();


    public slots:
        void synchronize();
        double getChainProgress() const;
        double getScanProgress() const;
        bool isActive() const;

    private:
        AccountsLoader _loader;
        SyncProgress _syncProgress;
        ChainScanner _scanner;
        BalanceObserver _balanceObserver;
};

}
