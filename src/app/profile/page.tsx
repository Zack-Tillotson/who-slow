import { Metadata } from "next";
import { buildViewData } from "@/state/buildViewData";
import { Profile } from "@/views/profile";

export const metadata: Metadata = {
  title: "Profile | Who Slow ",
}

export default async function PlayerPage() {


  const {interstitial, auth} = await buildViewData()

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }
    
  return (
    <Profile auth={auth} />
  )
}
