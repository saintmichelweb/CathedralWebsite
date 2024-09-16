export enum PortalUserStatus {
  UNVERIFIED = "Unverified",
  RESETPASSWORD = "Reset Password",
  ACTIVE = "Active",
  DISABLED = "Disabled",
}

export enum CommonStatusType {
  COMPLETED = 'Completed',
  PROCESSING = 'Processing',
  FAILED = 'Failed'
}

export enum StatusType {
  ACTIVATED = 'Activated',
  DEACTIVATED = 'Deactivated'
}

export enum MassDaysEnum_EN {
  WEEKDAYS = 'Monday - Friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

export enum MassDaysEnum_FR {
  WEEKDAYS = 'Lundi - Vendredi',
  SATURDAY = 'Samedi',
  SUNDAY = 'Dimanche'
}

export enum MassDaysEnum_RW {
  WEEKDAYS = 'Kuwa Mbere - Kuwa Gatanu',
  SATURDAY = 'Kuwa Gatandatu',
  SUNDAY = 'Kuwa Cyumweru'
}


export const daysOfWeekSelectOptions = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday'}
]

export const joursSemaineSelectOptions = [
  { value: 'Lundi', label: 'Lundi' },
  { value: 'Mardi', label: 'Mardi' },
  { value: 'Mercredi', label: 'Mercredi' },
  { value: 'Jeudi', label: 'Jeudi' },
  { value: 'Vendredi', label: 'Vendredi' },
  { value: 'Samedi', label: 'Samedi' },
  { value: 'Dimanche', label: 'Dimanche' }
]

export const IminsiYicyumweruSelectOptions = [
  { value: 'Ku wa mbere', label: 'Ku wa mbere' },
  { value: 'Ku wa Kabiri', label: 'Ku wa Kabiri' },
  { value: 'Mercredi', label: 'Mercredi' },
  { value: 'Ku wa gatatu', label: 'Ku wa gatatu' },
  { value: 'Ku wa gatanu', label: 'Ku wa gatanu' },
  { value: 'Ku wa gatandatu', label: 'Ku wa gatandatu' },
  { value: 'Ku cyumweru', label: 'Ku cyumweru' }
]

//const targetObject = { value: 'Tuesday', label: 'Tuesday' };
// const targetIndex = daysOfWeekOptions.findIndex(item => item.value === targetObject.value);