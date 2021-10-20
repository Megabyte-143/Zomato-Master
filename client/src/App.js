// HOC
import HomeLayoutHoc from "./HOC/home_hoc";

import Temp from "./component/temp";
import Master from "./component/master";

function App(){
  return (
    <>
    <HomeLayoutHoc path= "/" exact component = {Temp}
    ></HomeLayoutHoc>
    <HomeLayoutHoc path="/:type" exact component={Master}/>
    </>
  );
}

export default App;