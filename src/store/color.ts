import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import vinilexColors from '@/data/vinilex-colors.json'
import { Color } from '@/lib/types'

type ColorState = {
	colors: Color[]
}

const initialState: ColorState = {
	colors: [...vinilexColors],
}

const colorStore = create<ColorState>()(
	persist(
		() => ({
			...initialState,
		}),
		{
			name: 'color-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				colors: state.colors,
			}),
		},
	),
)

export const useColors = () => colorStore((state) => state.colors)
