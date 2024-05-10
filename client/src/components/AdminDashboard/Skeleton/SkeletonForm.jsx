import { Skeleton } from "antd"


export const SkeletonForm = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 20
    }}>
     <Skeleton.Avatar active={true} size={200} shape='square' />

     <Skeleton.Input active={true} block={true} />
     <Skeleton.Input active={true} block={true} />
     <Skeleton.Input active={true} block={true} />
     <Skeleton.Input active={true} block={true} />
     <Skeleton.Input active={true} block={true} />
     <Skeleton.Input active={true} block={true} />

    </div>
  )
}
