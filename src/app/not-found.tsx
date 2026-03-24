import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-8 text-center">
            <h1 className="text-9xl font-black text-amber-900">404</h1>
            <h2 className="mt-4 text-3xl font-bold text-amber-800">
                页面未找到
            </h2>
            <p className="mt-2 text-lg text-amber-700">
                您访问的页面不存在或已被移动
            </p>
            <div className="mt-8">
                <Link 
                    href="/"
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl font-semibold"
                >
                    返回首页
                </Link>
            </div>
        </div>
    )
}
