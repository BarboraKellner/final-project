// import './App.css'
// import {useEffect, useState} from 'react'
//
// import {supabase} from'./supabase'
//
//
// export function App() {
//
//     const [categories, setCategories] = useState([null])
//
//     useEffect(() => {
//         getCategories()
//     }, [])
//     const getCategories = async () => {
//         const{data, error} = await supabase
//             .from('categories')
//             .select()
//
//         if (error) {
//             console.log(error)
//             return
//         }
//
//         setCategories(data)
//         console.log(data)
//
//
//     }
//
//     return (
//         <>
//             <h1>NAME THAT THING!</h1>
//             {
//                 categories===null ?
//                     <p>Something is wrong 🫤 </p>
//                     : <ul>
//                         {categories.map(category => (
//                             <li key={category.id}>
//                                 <h3>{category.name}</h3>
//                             </li>
//                         ))}
//                     </ul>
//             }
//         </>
//     )
// }
//
// export default App