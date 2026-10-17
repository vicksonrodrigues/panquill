import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group'
import { Search } from 'lucide-react'

export function GroupSearch({ placeholder }: { placeholder: string }) {
    return (
        <InputGroup>
            <InputGroupInput placeholder={placeholder} />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    )
}
