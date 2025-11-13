'use client'
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TbMoodEmptyFilled } from "react-icons/tb";

const EmptyCard = ({ title, message }) => (
  <Card className="w-full max-w-md mx-auto mt-8 border border-gray-200 shadow-sm">
    <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
      <TbMoodEmptyFilled className="h-8 w-8 text-gray-400" />
      <CardTitle className="text-lg font-medium text-gray-700">{title}</CardTitle>
      <p className="text-gray-500 text-sm text-center">{message}</p>
    </CardContent>
  </Card>
);


export default EmptyCard;
