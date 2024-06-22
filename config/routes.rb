Rails.application.routes.draw do
  # Devise routes for user authentication
  devise_for :users

  # API routes for tasks, categories, and tags
  namespace :api do
    resources :tasks, only: [:index, :create, :update, :destroy]
    resources :categories, only: [:index, :create, :update, :destroy]
    resources :tags, only: [:index, :create, :update, :destroy]
  end

  # Catch-all route to render the React app
  root 'home#index'
  get '*path', to: 'home#index'
end
