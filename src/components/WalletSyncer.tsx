import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";
import { useApp } from "../context/AppContext";

const WalletSyncer = () => {
  const userWallets = useUserWallets();
  const { setWalletAddress } = useApp();

  useEffect(() => {
    if (userWallets && userWallets.length > 0) {
      setWalletAddress(userWallets[0].address);
    } else {
      setWalletAddress(null);
    }
  }, [userWallets, setWalletAddress]);

  return null;
};

export default WalletSyncer;
