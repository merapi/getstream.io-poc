import classNames from "classnames";
import { useState } from "react";
import { useStreamContext } from "react-activity-feed";
import { Link } from "react-router-dom";
import styled from "styled-components";

import users from "../users";
import FollowBtn from "./FollowBtn";
import More from "./Icons/More";
import Search from "./Icons/Search";
import getImageForUser from "../utils/getImageForUser";

const Container = styled.div`
  padding: 0 15px 15px;
  .follows {
    background-color: #222;
    border-radius: 20px;
    padding: 15px;
    h2 {
      font-size: 20px;
      color: white;
    }
  }
  .trends {
    margin-top: 10px;
    &-list {
      margin-top: 30px;
    }
    .trend {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      &__details {
        &__category {
          font-size: 13px;
          display: flex;
          color: #aaa;
          &--label {
            margin-left: 20px;
            position: relative;
            &::after {
              content: "";
              width: 2px;
              height: 2px;
              background-color: #aaa;
              border-radius: 50%;
              left: -10px;
              top: 0;
              bottom: 0;
              margin: auto 0;
              position: absolute;
            }
          }
        }
        &__title {
          font-weight: bold;
          color: white;
          font-size: 16px;
          margin: 2px 0;
          display: block;
        }
        &__tweets-count {
          color: #aaa;
          font-size: 12px;
        }
      }
      .more-btn {
        opacity: 0.5;
      }
    }
  }
  .follows {
    margin-top: 20px;
    &-list {
      margin-top: 30px;
    }
    .user {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      &__details {
        display: flex;
        text-decoration: none;
      }
      &__img {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &__name {
        font-weight: bold;
        font-size: 16px;
        color: white;
      }
      &__id {
        color: #aaa;
        font-size: 14px;
        margin-top: 2px;
      }
    }
    .show-more-text {
      font-size: 14px;
      color: var(--theme-color);
    }
  }
`;

export default function RightSide() {
  const [searchText, setSearchText] = useState("");

  const { client } = useStreamContext();

  const whoToFollow = users.filter((u) => {
    // filter out currently logged in user
    return u.id !== client.userId;
  });

  return (
    <Container>
      <div className="follows">
        <h2>Who to follow</h2>
        <div className="follows-list">
          {whoToFollow.map((user) => {
            return (
              <div className="user" key={user.id}>
                <Link to={`/${user.id}`} className="user__details">
                  <div className="user__img">
                    <img src={getImageForUser(user.id)} alt="" />
                  </div>
                  <div className="user__info">
                    <span className="user__name">{user.name}</span>
                    <span className="user__id">@{user.id}</span>
                  </div>
                </Link>
                <FollowBtn userId={user.id} />
              </div>
            );
          })}
        </div>
        {/* <span className="show-more-text">Show more</span> */}
      </div>
    </Container>
  );
}
