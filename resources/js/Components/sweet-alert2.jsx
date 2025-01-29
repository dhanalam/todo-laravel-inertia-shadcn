import {AlertCircle} from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function SweetAlert2({title, message = ''}) {
    return (
        <Alert variant="success">
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>{title}</AlertTitle>
            {message && message.length > 0 && (
                <AlertDescription>
                    {message}
                </AlertDescription>
            )}
        </Alert>
    )
}
