import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Color } from '@/lib/types'
import { nanoid } from '@/lib/utils'

import duluxColors from '@/data/dulux-colors.json'
import jotunColors from '@/data/jotun-colors.json'
import nipponPaintColors from '@/data/nippon-paint-colors.json'
import noDropColors from '@/data/no-drop-colors.json'

type ColorState = {
	colors: Color[]
	favoriteColorIds: Color['id'][]
	backgroundColor: Color | null
}

type ColorActions = {
	actions: {
		toggleFavoriteColor: (colorId: Color['id']) => void
		toggleBackgroundColor: (colorId: Color['id']) => void
	}
}

const initialState: ColorState = {
	colors: [
		...duluxColors,
		...jotunColors,
		...nipponPaintColors,
		...noDropColors,
	].map((color) => ({
		id: nanoid(),
		...color,
	})),
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
				toggleBackgroundColor: (colorId) =>
					set((state) => ({
						backgroundColor:
							state.backgroundColor && state.backgroundColor.id === colorId
								? null
								: state.colors.find((color) => color.id === colorId),
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
