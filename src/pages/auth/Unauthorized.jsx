import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Unauthorized = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🚫</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          {user
            ? `Aapka role "${user.role}" is page ko access karne ke liye authorized nahi hai.`
            : "Aap is page ko access karne ke liye authorized nahi hain."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
