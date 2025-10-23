"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { Project } from "@/components/providers"

export function useProjectsQuery() {
  const queryClient = useQueryClient()
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      // QueryClient'tan veriyi al
      const data = queryClient.getQueryData<Project[]>(["projects"])
      if (data) {
        return data
      }
      // Eğer veri yoksa boş array döndür
      return []
    },
    initialData: () => queryClient.getQueryData<Project[]>(["projects"]) ?? [],
    staleTime: Infinity, // Veri hiç eskimez
    gcTime: Infinity, // Garbage collection yapma
  })
}

export function useProjectSelection() {
  const queryClient = useQueryClient()

  const selected = useQuery<Project | null>({
    queryKey: ["selected-project"],
    queryFn: async () => queryClient.getQueryData<Project | null>(["selected-project"]) ?? null,
  })

  const loading = useQuery<boolean>({
    queryKey: ["selected-project-loading"],
    queryFn: async () => queryClient.getQueryData<boolean>(["selected-project-loading"]) ?? false,
  })

  const selectProject = (project: Project | null) => {
    queryClient.setQueryData(["selected-project"], project)
    queryClient.setQueryData(["selected-project-loading"], true)
    setTimeout(() => {
      queryClient.setQueryData(["selected-project-loading"], false)
    }, 800)
  }

  const clearSelection = () => selectProject(null)

  return {
    selectedProject: selected.data ?? null,
    isLoading: loading.data ?? false,
    selectProject,
    clearSelection,
  }
}