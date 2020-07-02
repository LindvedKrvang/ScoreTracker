export enum CallType {
    REGULAR = 'REGULAR',
    VIP = 'VIP',
    STRONG = 'STRONG',
    SANS = 'SANS',
    SUN = 'SUN',
    FULL_SUN = 'FULL_SUN',
    HALF_OPEN = 'HALF_OPEN',
    FULL_OPEN = 'FULL_OPEN'
}

export interface Call {
    name: string;
    callType: CallType;
    majorType: CallType;
}

export const Regular: Call = {
    name: 'Regular',
    callType: CallType.REGULAR,
    majorType: CallType.REGULAR
};

export const Vip: Call = {
    name: 'Vip',
    callType: CallType.VIP,
    majorType: CallType.REGULAR
};

export const Strong: Call = {
    name: 'Strong',
    callType: CallType.STRONG,
    majorType: CallType.REGULAR
};

export const Sans: Call = {
    name: 'Sans',
    callType: CallType.SANS,
    majorType: CallType.REGULAR
};

export const Sun: Call = {
    name: 'Sun',
    callType: CallType.SUN,
    majorType: CallType.SUN
};

export const FullSun: Call = {
    name: 'Full sun',
    callType: CallType.FULL_SUN,
    majorType: CallType.SUN
};

export const HalfOpen: Call = {
    name: 'Half open',
    callType: CallType.HALF_OPEN,
    majorType: CallType.SUN
};

export const FullOpen: Call = {
    name: 'Full open',
    callType: CallType.FULL_OPEN,
    majorType: CallType.SUN
};

export const Calls: Call[] = [
    Regular,
    Vip,
    Strong,
    Sans,
    Sun,
    FullSun,
    HalfOpen,
    FullOpen
];
