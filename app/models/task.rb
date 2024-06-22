class Task < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true
  has_and_belongs_to_many :tags, dependent: :destroy

  validates :title, presence: true
  validates :description, presence: true
end
