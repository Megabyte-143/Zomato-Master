// HOC
import HomeLayoutHoc from "./HOC/home_hoc";

import Temp from "./component/temp";

function App(){
  return (
    <>
    <HomeLayoutHoc path= "/" exact component = {Temp}
    ></HomeLayoutHoc>
    </>
  );
}

export default App;