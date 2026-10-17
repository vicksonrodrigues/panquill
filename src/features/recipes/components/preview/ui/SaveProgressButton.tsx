import { Button } from '@/components/ui/button'
import { Check, Save } from 'lucide-react'
import React from 'react'

export default function SaveProgressButton({
    saveState,
    onSave,
}: {
    saveState: 'idle' | 'saving' | 'saved'
    onSave: () => void
}) {
    return (
        <Button
            variant={'ghost'}
            size={'icon'}
            className="text-muted-foreground size-7"
            onClick={onSave}
            disabled={saveState === 'saving'}
            title="Save Progress"
        >
            {saveState === 'saved' ? (
                <Check className="size-3.5" />
            ) : (
                <Save className="size-3.5" />
            )}
        </Button>
    )
}
