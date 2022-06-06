import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import '../../styles/Skeleton.css'

export function TrendingSkeleton() {

    let skeletonArr = []

    for (let i = 0; i < 8; i++) {
        skeletonArr.push(
            <div className='trending-skeleton-box' >
                <Skeleton variant="circular" width={60} style={{ margin: "0 5px" }} height={60} />
                <div className="flex-center-column">
                    <Skeleton variant="text" width={190} height={20} />
                    <Skeleton variant="text" width={190} height={20} />
                    <Skeleton variant="text" width={190} height={20} />
                </div>
            </div>
        )
    }

    const skeletonRows = (
        skeletonArr.slice(0, 4).map((item, index) => {
            return (
                <div key={index}>{item}</div>
            )
        })
    )

    const skeletonRowsTwo = (
        skeletonArr.slice(4, 8).map((item, index) => {
            return (
                <div key={index}>{item}</div>
            )
        })
    )


    return (
        <>

            <div className='trending-div' style={{ padding: '0 0 20px 0' }}>
                <div className='trending-coins-div'>
                    <div className='flex-center'>
                        {skeletonRows}
                    </div>
                    <div className='flex-center'>
                        {skeletonRowsTwo}
                    </div>
                </div>
            </div>
        </>
    )
}


export function NewsSkeleton() {
    return (
        <>
            <div className='news-div'>
                <Skeleton variant="rectangular" width={250} height={120} />
                <Skeleton variant="text" width={250} height={50} />
                <Skeleton variant="text" width={200} height={50} />
                <Skeleton variant="text" width={250} height={20} />
            </div>
        </>
    )
}

export function TripleNewsSkeleton() {
    return (
        <>
            <div className='news-div news-skeleton-box'>
                <Skeleton variant="rectangular" width={250} height={120} />
                <Skeleton variant="text" width={250} height={50} />
                <Skeleton variant="text" width={200} height={50} />
                <Skeleton variant="text" width={250} height={20} />
            </div>
            <div className='news-div news-skeleton-box'>
                <Skeleton variant="rectangular" width={250} height={120} />
                <Skeleton variant="text" width={250} height={50} />
                <Skeleton variant="text" width={200} height={50} />
                <Skeleton variant="text" width={250} height={20} />
            </div>
            <div className='news-div news-skeleton-box'>
                <Skeleton variant="rectangular" width={250} height={120} />
                <Skeleton variant="text" width={250} height={50} />
                <Skeleton variant="text" width={200} height={50} />
                <Skeleton variant="text" width={250} height={20} />
            </div>
        </>
    )
}

