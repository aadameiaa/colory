import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import vinilexColors from '@/data/vinilex-colors.json'
import { Color } from '@/lib/types'

type ColorState = {
	colors: Color[]
	favoriteColorIds: Color['id'][]
}

type ColorActions = {
	actions: {
		toggleFavoriteColor: (colorId: Color['id']) => void
	}
}

const initialState: ColorState = {
	colors: [...vinilexColors],
	favoriteColorIds: [],
}

const colorStore = create<ColorState & ColorActions>()(
	persist(
		(set) => ({
			...initialState,
			actions: {
				toggleFavoriteColor: (colorId) =>
					set((state) => ({
						favoriteColorIds: state.favoriteColorIds.find(
							(id) => id === colorId,
						)
							? state.favoriteColorIds.filter((id) => id !== colorId)
							: [...state.favoriteColorIds, colorId],
					})),
			},
		}),
		{
			name: 'color-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				colors: state.colors,
				favoriteColorIds: state.favoriteColorIds,
			}),
		},
	),
)

export const useColors = () => colorStore((state) => state.colors)
export const useFavoriteColorIds = () =>
	colorStore((state) => state.favoriteColorIds)
export const useColorActions = () => colorStore((state) => state.actions)
