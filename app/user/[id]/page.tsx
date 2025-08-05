import { getUserById } from "@/lib/services/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail, User, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = await params;

  try {
    const user = await getUserById(userId);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          {/* Back to Home Button */}
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                      user.username || user.email
                    }`}
                    alt={user.username || "User"}
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {(user.username || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              <CardTitle className="text-2xl font-bold text-gray-800">
                {user.username || "Anonymous User"}
              </CardTitle>

              <CardDescription className="text-gray-600 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </CardDescription>
            </CardHeader>

            {/* Status */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 px-4 py-2"
              >
                ✅ Active User
              </Badge>
            </div>

            <CardContent className="space-y-6">
              {/* User Info */}
              <div className="w-full">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">User ID</p>
                    <p className="text-sm font-mono text-gray-800 break-all">
                      {user.id}
                    </p>
                  </div>
                </div>

                {user.role && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Role</p>
                      <Badge
                        variant={
                          user.role === "admin" ? "destructive" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.createdAt && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                    <CalendarDays className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Created
                      </p>
                      <p className="text-sm text-gray-800">
                        {new Date(user.createdAt).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {user.updatedAt && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                    <CalendarDays className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Last Updated
                      </p>
                      <p className="text-sm text-gray-800">
                        {new Date(user.updatedAt).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Raw Data (Collapsible) */}
              <details className="mt-6">
                <summary className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700 p-2 rounded bg-gray-50">
                  🔍 View Raw Data
                </summary>
                <pre className="mt-2 p-4 bg-gray-900 text-green-400 rounded-lg text-xs overflow-auto max-h-40">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </details>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          {/* Back Button for Error State */}
          <div className="mb-4 text-center">
            <Link href="/">
              <Button variant="outline" className="bg-white/80">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <Card className="shadow-lg border-red-200">
            <CardHeader className="text-center">
              <CardTitle className="text-red-600 flex items-center justify-center gap-2">
                ❌ Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Failed to load user data for ID:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">{userId}</code>
              </p>
              <p className="text-sm text-red-500 mt-2 text-center">
                {error instanceof Error
                  ? error.message
                  : "Unknown error occurred"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
