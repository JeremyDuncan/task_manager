class Category < ApplicationRecord
  belongs_to :user
  has_many :tasks

  validates :name, presence: true, uniqueness: { scope: :user_id, message: "You already have a category with this name" }
end
