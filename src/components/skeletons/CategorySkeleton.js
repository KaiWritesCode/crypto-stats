import Skeleton from '@mui/material/Skeleton'
import '../../styles/Skeleton.css'


export default function MainSkeleton() {
    const styles = {
        margin: "0 20px"
    }

    let skeletonArr = []

    for (let i = 0; i < 10; i++) {
        skeletonArr.push(
            <div className='skeleton-row'>

                <Skeleton variant="text" width="30%" height={35} style={styles} />
                <div className="flex-center" style={{ margin: "1px" }}>
                    <Skeleton variant="circular" style={{ margin: '5px' }} width={30} height={30} />
                    <Skeleton variant="circular" style={{ margin: '5px' }} width={30} height={30} />
                    <Skeleton variant="circular" style={{ margin: '5px' }} width={30} height={30} />
                </div>
                <Skeleton variant="text" width="80%" height={35} style={styles} />


            </div>
        )
    }

    const skeletonRows = (
        skeletonArr.map((item) => {
            return (
                <>{item}</>
            )
        })
    )


    return (
        <>
            {skeletonRows}
        </>
    )
}

