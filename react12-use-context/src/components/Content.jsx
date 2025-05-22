import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { SimpleContext } from "../context/SimpleContext";


const Content = () => {
  const { isDark } = useContext(ThemeContext);
  const userMessage = useContext(SimpleContext);
  return (

    <div className="content"
      style={{
        backgroundColor: isDark ? 'black' : 'lightgrey',
        color: isDark ? 'white' : 'black'
      }}
    >
      <p>{userMessage}</p>
    </div>
  );
}
export default Content;