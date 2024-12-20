import { 
  Campaign,
  DataState,
} from './types'

export default function campaignState(get: () => DataState, set: (state: Partial<DataState>) => void) {
  return {
    getCampaign(targetId: string|number) {
      const campaign = get().getCampaigns().find(({id}) => id === Number(targetId))
      return campaign
    },

    getCampaigns() {
      return get().campaigns
    },

    saveCampaign(campaign: Campaign) {
      // TODO validate campaign

      const {getCampaigns} = get()
      const campaigns = getCampaigns()
      
      // Update ID as needed
      if(campaign.id < 0) {
        campaign.id = campaigns[campaigns.length - 1]?.id + 1
      }

      const updatedCampaigns = [...campaigns]

      // Add to state
      const existingIndex = campaigns.findIndex(({id}) => id === campaign.id)
      if(existingIndex < 0) {
        updatedCampaigns.push(campaign)
      } else {
        updatedCampaigns[existingIndex] = campaign
      }
      
      set({
        campaigns: updatedCampaigns,
      })

      return campaign
    },

    getCampaignForm(campaign?: Campaign) {
      if(campaign) {
        return {...campaign}
      }

      return {
        id: '',
        name: '',
      }
    },

    getCampaignSessions(campaignId: number) {
      const campaign = get().getCampaign(campaignId)
      if(!campaign) return []

      const sessions = get().getSessions().filter(session => session.campaign == campaignId)

      return sessions
    }
  }
}