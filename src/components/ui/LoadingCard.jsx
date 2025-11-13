'use client'
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const LoadingCard = ({ text }) => (
  <Card className="w-full max-w-md mx-auto mt-8 border border-gray-200 shadow-sm">
    <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
      <Spinner className="h-8 w-8 text-blue-600" />
      <CardTitle className="text-lg font-medium text-gray-700">{text}</CardTitle>
    </CardContent>
  </Card>
);

export default LoadingCard