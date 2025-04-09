"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../authentication/sessionContext";
import AuthConfig from "../../authConfig";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { loading, user } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
    } else if (
      requiredRole
        .map((role) => role.toLowerCase())
        .includes(user.role?.toLowerCase())
    ) {
      setIsChecking(false);
    } else {
      router.replace(AuthConfig.authorization.url.unauthorized);
    }
  }, [loading, user, requiredRole, router]);

  if (loading || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {AuthConfig.ui.loading}
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
