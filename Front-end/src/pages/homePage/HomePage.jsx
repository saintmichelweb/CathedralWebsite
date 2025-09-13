import React, { useEffect, useState } from 'react'
import { EventsSection , BannerPage, MassScheduleSection} from '../../components/index'
import church from '../../assets/images/_K4C9496.jpg';
import { fetchHomeBannerImages } from '../../api/website'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'

export const HomePage = () => {
  const [bannerImage, setBannerImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadBanner = async () => {
    try {
      const res = await fetchHomeBannerImages()
      console.log('Banner images response:', res); // Debug log
      const list = Array.isArray(res) ? res : res?.data || []
      const imageUrl = list?.[0]?.image || null
      
      // Test if the image URL is accessible
      if (imageUrl) {
        try {
          const response = await fetch(imageUrl, { method: 'HEAD' });
          if (!response.ok) {
            console.warn('Banner image not accessible:', imageUrl);
            setBannerImage(null); // Will fallback to default
          } else {
            setBannerImage(imageUrl);
          }
        } catch (imgError) {
          console.warn('Banner image fetch failed:', imgError);
          setBannerImage(null); // Will fallback to default
        }
      } else {
        setBannerImage(null); // Will fallback to default
      }
    } catch (e) {
      console.error('Failed to load banner images:', e);
      setBannerImage(null); // Will fallback to default
      setError(null); // Don't show error since we have fallback
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBanner()
  }, [])

  return (
    <div>
      {loading ? (
        <LoadingState message="Loading banner..." />
      ) : error ? (
        <ErrorState title="Error loading banner" message={error} onRetry={() => { setLoading(true); setError(null); loadBanner() }} />
      ) : (
        <BannerPage pageTitle="CATHEDRALE SAINT MICHEL" image={bannerImage || church}/>
      )}
      
      <EventsSection/>
      <MassScheduleSection/>
    </div>
  )
}
