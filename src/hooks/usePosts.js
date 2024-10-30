import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, createPost, updatePost, deletePost } from '../services/postService';

// Custom hook to manage post data and mutations
export const usePosts = () => {
  const queryClient = useQueryClient();

  // Fetch posts with caching options
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'], 
    queryFn: getPosts,
    staleTime: 5000,
    cacheTime: 10000,
  });


  // Mutation to create a new post
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries(['posts']), 
  });

  // Mutation to update an existing post
  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => queryClient.invalidateQueries(['posts']), 
  });
  
  // Mutation to delete a post
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries(['posts']), 
  });

  return {
    posts,
    isLoading,
    error,
    createPost: createMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
  };
};
