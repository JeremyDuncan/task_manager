Rails.application.routes.draw do
  # Devise routes for user authentication, using custom sessions controller
  devise_for :users, controllers: { sessions: 'users/sessions' }

  devise_scope :user do
    get 'users/current', to: 'users/sessions#current'
  end

  resources :tasks, only: [:index, :show, :create, :update, :destroy] do
    collection do
      get 'new', to: 'home#index'
    end
  end

  resources :categories, only: [:index, :create, :update, :destroy]
  resources :tags, only: [:index, :create, :update, :destroy]

  # Catch-all route to render the React app
  root 'home#index'
  get '*path', to: 'home#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }
end
