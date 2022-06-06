import Skeleton from '@mui/material/Skeleton'
import '../../styles/Skeleton.css'


export default function MainSkeleton() {
    const styles = { margin: "0 20px" }


    let skeletonArr = []

    for (let i = 0; i < 10; i++) {
        skeletonArr.push(
            <div className='skeleton-row'>
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" width="80%" height={35} style={styles} />
                <Skeleton variant="rectangular" width={190} height={60} />
            </div>
        )
    }

    const skeletonRows = (
        skeletonArr.map((item, index) => {
            return (
                <div key={index}>{item}</div>
            )
        })
    )


    return (
        <>
            {skeletonRows}
        </>
    )
}


