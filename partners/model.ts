export interface PartnersCandidate {
  id: number
  login: number
  firstName: string
  lastName: string
  middleName: string
  activationDate: string
  goStatus: number
  pv: number
  rank: number
  rankTitle: string
  countAvailableBranches: number
  sponsor: PartnersSponsor
}

export interface PartnersPeople {
  total: number
  fromSponsor: number
  firstLevel: number
}

export interface PartnersActivity {
  currentMonth: boolean
  nextMonth: boolean
  restPV?: number
}

export interface PartnersBranch {
  number: number
  free: boolean
  startPartner: PartnersStartPartner | PartnersStartPartnerWithGoStatus
  people: PartnersPeople
  activity: PartnersActivity
}

export interface PartnersVolume {
  value: number;
  unit: string;
}

export type PartnersCandidateForLinking = Omit<PartnersCandidate, 'id' | 'rank' | 'rankTitle' | 'countAvailableBranches' | 'sponsor'>;
export type PartnersCandidateForLastBranch = Omit<PartnersCandidate, 'id' | 'activationDate' | 'pv' | 'sponsor'>;
export type PartnersCandidateForSearchInTree = Omit<PartnersCandidate, 'activationDate' | 'pv' | 'sponsor'>;
export type PartnersBranchRegular = Omit<PartnersBranch, 'people' | 'activity'>;
export type PartnersStartForHierarchyToTop = Omit<PartnersCandidate, 'activationDate' | 'pv' | 'countAvailableBranches'>;
export type PartnersDataForHierarchyToTop = Omit<PartnersCandidate, 'id' | 'activationDate' | 'pv' | 'countAvailableBranches'>;

export type PartnersStartPartner = Pick<PartnersCandidate, 'login' | 'firstName' | 'lastName'>;
export type PartnersStartPartnerWithGoStatus = Pick<PartnersCandidate, 'login' | 'firstName' | 'lastName' | 'goStatus'>;
export type PartnersSponsor = Pick<PartnersCandidate, 'login' | 'firstName' | 'lastName' | 'middleName'>;
export type PartnersCandidateForBlocked = Pick<PartnersCandidate, 'login' | 'activationDate' | 'rankTitle'>;

export interface PartnersLastBranch extends PartnersCandidateForLastBranch {
  branches: PartnersBranchRegular[]
}

export interface PartnersSearchPartnerInTree extends PartnersCandidateForSearchInTree {
  sponsor: PartnersSponsor,
  branches: PartnersBranchRegular[]
}

export interface PartnersBranchForAvailable {
  number: number
  startPartner: PartnersStartPartner
  peopleInStructure: PartnersPeople
  activity: PartnersActivity
  savedVolume: PartnersVolume
  isBig: boolean
  groupBonus: PartnersVolume
  tradeTurnover: PartnersVolume
}

export interface PreСalcGroupBonusBranch {
  number: number
  parentPartner: PartnersSponsor
  partner: PartnersSponsor
  activity: boolean
  isBig: boolean
}

export interface PreСalcGroupBonusBigBranch {
  number: number
  savedVolume: number
}

export interface PreСalcGroupBonus {
  turnover: PartnersVolume
  decommissioningFromLargeBranch: PartnersVolume
  groupBonus: PartnersVolume
  savedVolume: PartnersVolume
  bigBranchNumber: number
}

export interface PartnersViewTreeData extends PartnersStartPartner {
  goStatus?: number
  gpv: number
}

export interface PartnersViewTreeParams {
  partner: PartnersViewTreeData
  parentLogin: number
  branchNumber: number
  level: number
  partnersInTree?: number
  children?: PartnersViewTreeParams
}
