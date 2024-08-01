import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import vinilexColors from '@/data/vinilex-colors.json'
import { Color } from '@/lib/types'

type ColorState = {
	colors: Color[]
	favoriteColorIds: Color['id'][]
	backgroundColor: Color | null
}

type ColorActions = {
	actions: {
		toggleFavoriteColor: (colorId: Color['id']) => void
		toggleBackgroundColor: (color: Color) => void
	}
}

const initialState: ColorState = {
	colors: [...vinilexColors],
	favoriteColorIds: [],
	backgroundColor: null,
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
				toggleBackgroundColor: (color) =>
					set((state) => ({
						backgroundColor:
							state.backgroundColor && state.backgroundColor.id === color.id
								? null
								: color,
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
export const useBackgroundColor = () =>
	colorStore((state) => state.backgroundColor)
export const useColorActions = () => colorStore((state) => state.actions)
