import BasicLayout from '../containers/Layout';

export default function Root(props) {
  return (
    <>
    <BasicLayout>
        {props.children}
    </BasicLayout>
    </>
  )
}