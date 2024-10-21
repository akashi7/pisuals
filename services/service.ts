export interface DataItem {
  id: number
  customer_name: string
  email: string
  signup_date: string
  last_activity: string
}

export interface VistDataItem {
  id: number
  pageView: number
  visitors: number
  rate: number
  duration: number
  date: string
}

export const fetchDataList = async (): Promise<DataItem[]> => {
  const response = await fetch('/api/dataList')
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

export const fetchVisitData = async (): Promise<VistDataItem[]> => {
  const response = await fetch('/api/visitData')
  if (!response.ok) {
    throw new Error('Failed to fetch visit data')
  }
  return response.json()
}
